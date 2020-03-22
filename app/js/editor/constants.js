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
import Link from './menuItem/link'
import Code from './menuItem/code'
import List from './menuItem/list'
import Align from './menuItem/align'
import Quote from './menuItem/quote'
import Image from './menuItem/image'
import Table from './menuItem/table'
import Undo from './menuItem/undo'
import Redo from './menuItem/redo'

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
    link: <Link></Link>,
    code: <Code></Code>,
    list: <List></List>,
    justify: <Align></Align>,
    quote: <Quote></Quote>,
    image: <Image></Image>,
    table: <Table></Table>,
    undo: <Undo></Undo>,
    redo: <Redo></Redo>,
  },
  headOptions: [
    { label: 'H1', value: '<h1>' },
    { label: 'H2', value: '<h2>' },
    { label: 'H3', value: '<h3>' },
    { label: 'H4', value: '<h4>' },
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
  languageOptions: [
    { label: 'javascript', value: 'javascript' },
    { label: 'html', value: 'html' },
    { label: 'java', value: 'java' },
    { label: 'css', value: 'css' },
    { label: 'scss', value: 'scss' },
    { label: 'c', value: 'c' },
    { label: 'c++', value: 'c++' },
    { label: 'basic', value: 'basic' },
    { label: 'python', value: 'python' },
    { label: 'r', value: 'r' },
    { label: 'sql', value: 'sql' },
    { label: 'shell', value: 'shell' },
    { label: 'swift', value: 'swift' },
  ],
  listOptions: [
    { label: '有序列表', value: 'sorted-list' },
    { label: '无序列表', value: 'unsorted-list' },
  ],
  justifyOptions: [
    { label: '左对齐', value: 'justifyLeft' },
    { label: '居中', value: 'justifyCenter' },
    { label: '右对齐', value: 'justifyRight' },
  ],
  alignOptions: [
    { label: '无', value: 'default' },
    { label: '左对齐', value: 'alignleft' },
    { label: '居中', value: 'alignCenter' },
    { label: '右对齐', value: 'alignRight' },
  ],
  imageTabOptions: [
    { label: '图像信息', value: 'imageMessage' },
    { label: '图片上传', value: 'imageUpload' },
  ]
}
