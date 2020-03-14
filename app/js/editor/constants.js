import React from 'react'
import Head from './menuItem/head'
import Bold from './menuItem/bold'
import FontSize from './menuItem/fontSize'
import FontName from './menuItem/fontName'
import Italic from './menuItem/italic'
import Underline from './menuItem/underline'
import Strikethrough from './menuItem/strikethrough'
import ForeColor from './menuItem/foreColor'
import BackColor from './menuItem/backColor'

export default {
  menusItem: {
    head: <Head></Head>,
    bold: <Bold></Bold>,
    fontSize: <FontSize></FontSize>,
    fontName: <FontName></FontName>,
    italic: <Italic></Italic>,
    underline: <Underline></Underline>,
    strikeThrough: <Strikethrough></Strikethrough>,
    foreColor: <ForeColor></ForeColor>,
    backColor: <BackColor></BackColor>,
  },
  headOptions: [
    { label: 'H1', value: 'H1' },
    { label: 'H2', value: 'H2' },
    { label: 'H3', value: 'H3' }
  ],
  fontOptions: [
    { label: 'x-small', value: 'x-small' },
    { label: 'small', value: 'small' },
    { label: 'normal', value: 'normal' },
    { label: 'large', value: 'large' },
    { label: 'x-large', value: 'x-large' },
    { label: 'xx-large', value: 'xx-large' },
  ],
  fontNameOptions: [
    { label: '宋体', value: '宋体' },
    { label: '微软雅黑', value: '微软雅黑' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Tahoma', value: 'Tahoma' },
    { label: 'Verdana', value: 'Verdana' },
  ],
}
