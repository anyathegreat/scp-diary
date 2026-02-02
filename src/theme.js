import { createTheme, Divider, List } from "@mantine/core";

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

    Button: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.brown[0],
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
          backgroundColor: theme.colors.beige[4],
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
        label: {
          color: theme.colors.brown[5],
          fontSize: "16px",
          fontWeight: 600,
        },

        input: {
          backgroundColor: theme.colors.beige[4],
          border: `2px solid ${theme.colors.brown[5]}`,
          color: theme.colors.brown[5],
        },
      }),
    },

    TextInput: {
      styles: (theme) => ({
        label: {
          color: theme.colors.brown[5],
          fontSize: "16px",
          fontWeight: 600,
        },

        input: {
          backgroundColor: theme.colors.beige[4],
          border: `2px solid ${theme.colors.brown[5]}`,
          color: theme.colors.brown[5],
        },
      }),
    },

    FileInput: {
      styles: (theme) => ({
        input: {
          backgroundColor: theme.colors.beige[4],
          border: `2px solid ${theme.colors.brown[5]}`,
          color: theme.colors.brown[5],
        },

        section: {
          color: theme.colors.brown[5],
        },
      }),
    },

    Accordion: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.brown[5],
        },

        icon: {
          color: theme.colors.beige[0],
        },

        label: {
          color: theme.colors.beige[0],
          fontSize: "18px",
          fontWeight: 700,
        },

        content: {
          backgroundColor: theme.colors.beige[7],
          color: theme.colors.brown[5],
        },
      }),
    },

    Tabs: {
      styles: (theme) => ({
        list: {
          "--tabs-list-gap": "13px",
        },

        tab: {
          border: `2px solid ${theme.colors.brown[3]}`,
          color: theme.colors.brown[3],
          fontSize: "18px",
          fontWeight: "600",
        },

        panel: {
          color: theme.colors.brown[3],
          fontSize: "18px",
          padding: "8px",
          border: `2px solid ${theme.colors.brown[3]}`,
        },
      }),
    },

    Typography: {
      styles: (theme) => ({
        root: {
          color: theme.colors.brown[3],
          backgroundColor: theme.colors.beige[1],
        },
      }),
    },

    Select: {
      styles: (theme) => ({
        input: {
          color: theme.colors.brown[5],
          fontSize: "18px",
          fontWeight: 600,
        },

        wrapper: {
          "--input-bg": theme.colors.beige[4],
          "--input-bd": theme.colors.brown[5],
        },

        dropdown: {
          backgroundColor: theme.colors.beige[4],
          border: `3px solid ${theme.colors.brown[8]}`,
          color: theme.colors.brown[5],
          fontSize: "18px",
          fontWeight: 600,
        },
      }),
    },

    Modal: {
      defaultProps: {
        closeButtonProps: {
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = theme.colors.beige[0];
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = theme.colors.beige[9];
          },
        },
      },

      styles: (theme) => ({
        overlay: {
          backgroundColor: theme.colors.dark[9] + "60",
        },

        header: {
          color: theme.colors.brown[3],
          backgroundColor: theme.colors.beige[9],
        },

        title: {
          fontSize: "22px",
          fontWeight: 700,
          width: "90%",
          textAlign: "center",
        },

        close: {
          color: theme.colors.brown[6],
        },

        content: {
          backgroundColor: theme.colors.beige[9],
        },
      }),
    },
  },
});
