"use client";
import { SimplePaletteColorOptions, createTheme } from "@mui/material";
import { Prompt } from 'next/font/google'
const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-prompt', // This allows us to use it as a CSS variable
})


const bodyFont = prompt.style.fontFamily;


declare module "@mui/material" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }

  interface TypographyVariants {
    heading1: React.CSSProperties | { [k: string]: object };
    heading2: React.CSSProperties | { [k: string]: object };
    heading3: React.CSSProperties | { [k: string]: object };
    heading4: React.CSSProperties | { [k: string]: object };
    heading5: React.CSSProperties | { [k: string]: object };
    heading6: React.CSSProperties | { [k: string]: object };
    subtitle1: React.CSSProperties | { [k: string]: object };
    subtitle2: React.CSSProperties | { [k: string]: object };
    subtitle3: React.CSSProperties | { [k: string]: object };
    body1: React.CSSProperties | { [k: string]: object };
    body2: React.CSSProperties | { [k: string]: object };
    caption: React.CSSProperties | { [k: string]: object };
    overline: React.CSSProperties | { [k: string]: object };
  }

  interface TypographyVariantsOptions {
    heading1: React.CSSProperties | { [k: string]: object };
    heading2: React.CSSProperties | { [k: string]: object };
    heading3: React.CSSProperties | { [k: string]: object };
    heading4: React.CSSProperties | { [k: string]: object };
    heading5: React.CSSProperties | { [k: string]: object };
    heading6: React.CSSProperties | { [k: string]: object };
    subtitle1: React.CSSProperties | { [k: string]: object };
    subtitle2: React.CSSProperties | { [k: string]: object };
    subtitle3: React.CSSProperties | { [k: string]: object };
    body1: React.CSSProperties | { [k: string]: object };
    body2: React.CSSProperties | { [k: string]: object };
    caption: React.CSSProperties | { [k: string]: object };
    overline: React.CSSProperties | { [k: string]: object };
  }

  interface Palette {
    main: SimplePaletteColorOptions;
    dark: SimplePaletteColorOptions;
    light: SimplePaletteColorOptions;
    contrast: SimplePaletteColorOptions;
    orange: SimplePaletteColorOptions;
    green: SimplePaletteColorOptions;
    red: SimplePaletteColorOptions;
    whitesmoke: SimplePaletteColorOptions;
    lightblue: SimplePaletteColorOptions;
    neonblue: SimplePaletteColorOptions;
    blue: SimplePaletteColorOptions;
    black: SimplePaletteColorOptions;
    gray: SimplePaletteColorOptions;
  }

  interface PaletteOptions {
    main?: SimplePaletteColorOptions;
    dark?: SimplePaletteColorOptions;
    light?: SimplePaletteColorOptions;
    contrast?: SimplePaletteColorOptions;
    orange?: SimplePaletteColorOptions;
    green?: SimplePaletteColorOptions;
    red?: SimplePaletteColorOptions;
    whitesmoke?: SimplePaletteColorOptions;
    lightblue?: SimplePaletteColorOptions;
    neonblue?: SimplePaletteColorOptions;
    blue?: SimplePaletteColorOptions;
    black?: SimplePaletteColorOptions;
    gray?: SimplePaletteColorOptions;
  }

  interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
    focusVisible: string;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    heading1: true;
    heading2: true;
    heading3: true;
    heading4: true;
    heading5: true;
    heading6: true;
    subtitle1: true;
    subtitle2: true;
    subtitle3: true;
    body1: true;
    body2: true;
    caption: true;
    overline: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    contained: true;
    containedSecondary: true;
    text: true;
    textSecondary: true;
    outlined: true;
    back: true;
  }

  interface ButtonPropsSizeOverrides {
    small: true;
    medium: true;
    slarge: true;
    large: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsSizeOverrides {
    large: true;
    medium: true;
    small: true;
  }
}

export const theme = createTheme({
  spacing: 8,
  palette: {
    warning: { main: "#EF6C00" },
    success: { main: "#2E7D32" },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
      focusVisible: "rgba(0, 0, 0, 0.30)",
    },
    primary: {
      main: "#3486F0",
      dark: "#3062CA",
      50: "#E4F2FF",
      100: "#BDDEFF",
      200: "#93C9FF",
      300: "#68B4FF",
      400: "#4AA4FF",
      500: "#3494FF",
      600: "#3486F0",
      700: "#3273DC",
      800: "#3062CA",
      900: "#2B42AA",
      A100: "#BDDEFF",
      A200: "#93C9FF",
      A400: "#4AA4FF",
      A700: "#3273DC",
      light: "rgba(52, 132, 240, 0.08)",
    },
    main: {
      main: "#5C848E",
      light: "#F0C555",
      dark: "#68B4FF",
    },
    secondary: {
      main: "#343434",
      light: "#3486F0",
      dark: "#68B4FF",
    },
    dark: {
      main: "#3486F0",
      light: "#3062CA",
      dark: "#4AA4FF",
      contrastText: "#A5A3AE4D",
    },
    light: {
      main: "#3486F0",
      light: "#93C9FF",
      dark: "#E4F2FF",
      contrastText: "#85B5F6",
    },
    contrast: {
      main: "#3486F0",
      light: "#FFFFFF",
      dark: "rgba(0, 0, 0, 0.87)",
    },
    error: {
      main: "#D32F2F",
      dark: "#C62828",
      light: "#EF5350",
    },
    orange: {
      main: "#EF6C00",
    },
    green: {
      main: "#2E7D32",
      light: "#d9ead3",
    },
    red: {
      main: "#D32F2F",
      light: "#D32F2F14",
    },
    whitesmoke: {
      main: "#f5f5f5",
    },
    lightblue: {
      main: "#3484F014",
      light: "#0288D1",
      dark: "#F1F6FE",
      contrastText: "#3484F030",
    },
    neonblue: {
      main: "#ecf1f9",
    },
    blue: {
      main: "#3484F0",
    },
    action: {
      selected: "#000000",
      hover: "#3484F00A",
      active: "rgba(0, 0, 0, 0.56)",
    },
    black: {
      main: "#333639",
      light: "#717375",
      dark: "rgba(0, 0, 0, 0.24)",
      contrastText: "rgba(0, 0, 0, 0.08)",
    },
    gray: {
      main: "#00000012",
      dark: "#0000001F",
      light: "#FAFAFA",
      contrastText: "#00000061",
    },
  },
  typography: {
    fontFamily: bodyFont,
    heading1: {
      fontFamily: bodyFont,
      fontSize: "60px",
      fontWeight: 600,
      lineHeight: "116.7%",
    },
    heading2: {
      fontFamily: bodyFont,
      fontSize: "48px",
      fontWeight: 600,
      lineHeight: "120%",
    },
    heading3: {
      fontFamily: bodyFont,
      fontSize: "34px",
      fontWeight: 600,
      lineHeight: "116.7%",
    },
    heading4: {
      fontFamily: bodyFont,
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "123.5%",
    },
    heading5: {
      fontFamily: bodyFont,
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "133.4%",
    },
    heading6: {
      fontFamily: bodyFont,
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "140%",
    },
    subtitle1: {
      fontFamily: bodyFont,
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "175%",
    },
    subtitle2: {
      fontFamily: bodyFont,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "157%",
    },
    subtitle3: {
      fontFamily: bodyFont,
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: "169.231%",
    },
    body1: {
      fontFamily: bodyFont,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "150%",
    },
    body2: {
      fontFamily: bodyFont,
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "143%",
    },
    caption: {
      fontFamily: bodyFont,
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "166%",
    },
    overline: {
      fontFamily: bodyFont,
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "266%",
      textTransform: "uppercase",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          heading1: "h1",
          heading2: "h2",
          heading3: "h3",
          heading4: "h4",
          heading5: "h5",
          heading6: "h6",
          subtitle1: "p",
          subtitle2: "p",
          subtitle3: "p",
          body1: "p",
          body2: "p",
          caption: "p",
          overline: "p",
        },
        color: "text.primary",
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#D32F2F",
          "&$error": {
            color: "#D32F2F",
          },
        },
        root: {
          display: "flex !important",
          flexDirection: "row-reverse",
          columnGap: "4px",
          backgroundColor: "#fff",
          paddingRight: "8px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          ".Mui-disabled.Mui-error.MuiInputBase-formControl .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#D32F2F !important",
            },
        },
      },
      variants: [
        // {
        //   props: {
        //     size: 'medium',
        //   },
        //   style: {
        //     input: {
        //       padding: '12px',
        //       fontSize: '14px',
        //     },
        //     textarea: {
        //       padding: '12px',
        //       fontSize: '14px',
        //     },
        //     '& fieldset': {
        //       borderRadius: '4px !important',
        //     },
        //   },
        // },
        {
          props: {
            size: "small",
          },
          style: {
            input: {
              padding: "12px",
              fontSize: "16px",
              height: "16px",
            },
            textarea: {
              padding: "8px",
              fontSize: "16px",
              lineHeight: "18px",
            },
            "& fieldset": {
              borderRadius: "8px !important",
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "unset",
        },
        sizeLarge: ({ ownerState }) => ({
          padding: ownerState.variant === "outlined" ? "7px 21px" : "8px 22px",
          fontSize: "15px",
          fontWeight: 600,
          lineHeight: "26px",
        }),
        sizeMedium: ({ ownerState }) => ({
          padding: ownerState.variant === "outlined" ? "5px 15px" : "6px 16px",
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: "24px",
        }),
        sizeSmall: ({ ownerState }) => ({
          padding: ownerState.variant === "outlined" ? "3px 9px" : "4px 10px",
          fontSize: "13px",
          fontWeight: 600,
          lineHeight: "22px",
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        colorSecondary: {
          backgroundColor: "#00000014",
          color: "black",
        },
        deleteIconColorSecondary: {
          color: "#AEAEAE",
          ":hover": {
            color: "grey",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          maxHeight: "40dvh",
        },
      },
    },
  },
});
