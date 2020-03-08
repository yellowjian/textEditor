const THEMECONFIG = {
  dark: {
    fontColor: 'text-color-2',
    linkColor: 'link-color-2',
    selectedColor: 'white',
    checkbox: {
      backgroundColor: 'bg-color-3',
      borderColor: 'bg-color-1',
      shadowColor: 'shadow-color-1',
      insetColor: 'shadow-color-2',
      hover: {
        shadowColor: 'shadow-color-1',
        insetColor: 'link-color-1',
      },
      checked: {
        backgroundColor: 'link-color-1',
        color: 'bg-color-1',
      }
    },
    button: {
      fontColor: 'link-color-1',
      backgroundColor: 'bg-color-2',
      shadowColor: 'shadow-color-2',
      borderColorTop: 'shadow-color-1',
      borderColorRight: 'shadow-color-2',
      borderColorBottom: 'shadow-color-2',
      borderColorLeft: 'shadow-color-1',
      hover: {
        fontColor: 'link-color-3',
        backgroundColor: 'gray-8',
      },
      active: {
        fontColor: 'white',
        backgroundColor: 'gray-7'
      }
    },
    input: {
      color: 'text-color-2',
      backgroundColor: 'bg-color-3',
      borderColorTop: 'shadow-color-2',
      borderColorRight: 'shadow-color-1',
      borderColorBottom: 'shadow-color-1',
      borderColorLeft: 'shadow-color-2',
      active: {
        borderColor: 'link-color-1'
      }
    },
    dropdown: {
      hover: {
        backgroundColor: 'gray-10'
      }
    },
    loading: {
      bgColor: 'bg-color-4',
      fontColor: 'text-color-2'
    },
    icon: {
      fontColor: 'link-color-1',
      active: {
        fontColor: 'white',
      }
    },
    tooltip: {
      backgroundColor: 'bg-color-2',
      borderColorTop: 'shadow-color-1',
      borderColorRight: 'shadow-color-2',
      borderColorBottom: 'shadow-color-2',
      borderColorLeft: 'shadow-color-1',
    }
  },
  light: {
    fontColor: 'text-color-5',
    linkColor: 'blue-3',
    selectedColor: 'gray-11',
    checkbox: {
      backgroundColor: 'white',
      borderColor: 'white',
      shadowColor: 'shadow-color-3',
      insetColor: 'shadow-color-4',
      hover: {
        shadowColor: 'shadow-color-1',
        insetColor: 'blue',
      },
      checked: {
        backgroundColor: 'blue',
        color: 'white',
      }
    },
    button: {
      fontColor: 'blue',
      backgroundColor: 'gray-2',
      shadowColor: 'shadow-color-5',
      borderColorTop: 'shadow-color-3',
      borderColorRight: 'shadow-color-4',
      borderColorBottom: 'shadow-color-4',
      borderColorLeft: 'shadow-color-3',
      hover: {
        fontColor: 'link-color-2',
        backgroundColor: 'gray-1',
      },
      active: {
        fontColor: 'gray-11',
        backgroundColor: 'gray-1'
      }
    },
    input: {
      color: 'gray-8',
      backgroundColor: 'white',
      borderColorTop: 'shadow-color-4',
      borderColorRight: 'shadow-color-3',
      borderColorBottom: 'shadow-color-3',
      borderColorLeft: 'shadow-color-4',
      active: {
        borderColor: 'blue'
      }
    },
    dropdown: {
      hover: {
        backgroundColor: 'white'
      }
    },
    loading: {
      bgColor: 'bg-color-4',
      fontColor: 'gray-8'
    },
    icon: {
      fontColor: 'blue',
      active: {
        fontColor: 'gray-11',
      }
    },
    tooltip: {
      backgroundColor: 'gray-2',
      borderColorTop: 'shadow-color-3',
      borderColorRight: 'shadow-color-4',
      borderColorBottom: 'shadow-color-4',
      borderColorLeft: 'shadow-color-3',
    }
  }
}
export default THEMECONFIG