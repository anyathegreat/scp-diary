import { createTheme, Textarea } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Underdog, serif",

  colors: {
    brown: [
      "#8b5a2b",
      "#5D2800ff",
      "#552400ff",
      "#4C2100ff",
      "#441D00ff",
      "#3B1900ff",
      "#331600ff",
      "#2A1200ff",
      "#220F00ff",
      "#190B00ff",
      "#110700ff",
      "#080400ff",
      "#000000ff",
    ],
    beige: [
      "#efdec1",
      "#ECE0CCff",
      "#E6DAC6ff",
      "#E1D5C0ff",
      "#DBCFBBff",
      "#D5C9B5ff",
      "#D0C3AFff",
      "#CABEA9ff",
      "#C5B8A3ff",
      "#BFB29Dff",
      "#B9AC98ff",
      "#B4A792ff",
      "#AEA18Cff",
    ],
  },

  components: {
    Title: {
      defaultProps: {
        ff: "Underdog, cursive",
      },
      styles: (theme) => ({
        root: {
          color: theme.colors.brown[3],
        },
      }),
    },

    Text: {
      styles: (theme) => ({
        root: {
          color: theme.colors.brown[5],
        },
      }),
    },

    AppShell: {
      styles: (theme) => ({
        root: {
          "--app-shell-border-color": theme.colors.brown[5],
        },
      }),
    },

    Card: {
      styles: (theme) => ({
        root: {
          border: `3px solid ${theme.colors.brown[5]}`,
        },
      }),
    },

    Timeline: {
      styles: (theme) => ({
        itemBullet: {
          backgroundColor: theme.colors.beige[10],
          borderColor: theme.colors.brown[0],
        },

        item: {
          "--item-border-color": theme.colors.brown[0],
        },
      }),
    },

    Textarea: {
      styles: (theme) => ({
        input: {
          backgroundColor: theme.colors.beige[4],
          borderColor: theme.colors.brown[5],
          color: theme.colors.brown[5],
        },
      }),
    },
  },
});
