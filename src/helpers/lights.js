const DEFAULT_COLORS = [
  "#ff4d4d", // red
  "#ffd966", // yellow
  "#4dff88", // green
  "#4da6ff", // blue
  "#c77dff", // purple
];

function sinY(x, width, base, amp) {
  return base + Math.sin(x / (width / 2)) * amp;
}

function createSVG(width, { bulbs = 26, colors = DEFAULT_COLORS, amplitude = 6, wireY = 4 }) {
  const height = 42;
  const spacing = width / (bulbs - 1);

  // wire
  let wire = `M 0 ${wireY}`;
  for (let x = 0; x <= width; x += 6) {
    wire += ` L ${x} ${sinY(x, width, wireY, amplitude)}`;
  }

  // bulbs
  const bulbsSvg = Array.from({ length: bulbs })
    .map((_, i) => {
      const x = spacing * i;
      const y = sinY(x, width, wireY, amplitude);
      const color = colors[i % colors.length];

      return `
      <line x1="${x}" y1="${y}" x2="${x}" y2="${y + 4}"
            stroke="#555" stroke-width="1"/>

      <rect x="${x - 2}" y="${y + 4}" width="4" height="3"
            rx="1" fill="#444"/>

      <circle cx="${x}" cy="${y + 9}" r="3"
              fill="${color}"
              class="ui-garland-bulb"/>
    `;
    })
    .join("");

  return `
<svg width="${width}" height="${height}"
     viewBox="0 0 ${width} ${height}">
  <path d="${wire}"
        stroke="#555"
        stroke-width="1.2"
        fill="none"/>
  ${bulbsSvg}
</svg>`;
}

export function attachGarland(
  container,
  options = {
    position: "top",
    bulbs: 28,
    force: false,
  }
) {
  if (!container) return;

  function isDateInRange(date) {
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();
    const isDecember = currentMonth === 11 && currentDay >= 1;
    const isJanuary = currentMonth === 0 && currentDay <= 14;
    return isDecember || isJanuary;
  }

  const currentDate = new Date();
  if (!options?.force) {
    if (!isDateInRange(currentDate)) {
      return;
    }
  }

  // container.style.position ||= "relative";

  const stylesEl = document.createElement("style");
  stylesEl.innerHTML = `
    .ui-garland {
      position: absolute;
      left: 0;
      right: 0;
      height: max-content;
      pointer-events: none;
      z-index: 1;
    }

    .ui-garland--top {
      top: 0;
    }

    .ui-garland--bottom {
      bottom: 0;
      transform: translatey(80%);
    }

    .ui-garland svg {
      display: block;
    }

    .ui-garland-bulb {
      opacity: 0.9;
      animation: ui-garland-blink 3.2s infinite ease-in-out;
    }

    .ui-garland-bulb:nth-child(4n) {
      animation-delay: 1.6s;
    }

    @keyframes ui-garland-blink {
      0%,
      100% {
        opacity: 0.4;
        filter: drop-shadow(0 0 1px currentColor);
      }
      50% {
        opacity: 1;
        filter: drop-shadow(0 0 5px currentColor);
      }
    }

    `;

  const el = document.createElement("div");
  el.className = `ui-garland ui-garland--${options.position || "top"}`;
  container.appendChild(stylesEl);
  container.appendChild(el);

  let lastWidth = 0;
  let raf = null;

  function render(width) {
    const styles = getComputedStyle(container);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const innerWidth = width + paddingLeft + paddingRight;

    const modifiedOptions = { ...options };
    if (innerWidth < 500) {
      modifiedOptions.bulbs = options.bulbs / 3;
    }

    el.innerHTML = createSVG(innerWidth, modifiedOptions);
  }

  const observer = new ResizeObserver((entries) => {
    const width = Math.floor(entries[0].contentRect.width);
    if (width === lastWidth) return;

    lastWidth = width;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => render(width));
  });

  observer.observe(container);

  // initial render
  render(container.clientWidth);

  return () => {
    observer.disconnect();
    el.remove();
    stylesEl.remove();
  };
}
