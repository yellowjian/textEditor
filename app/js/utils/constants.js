import Head from '../editor/menuItem/head'
import Bold from '../editor/menuItem/bold'

export default {
  menusItem: {
    head: <Head></Head>,
    bold: <Bold></Bold>
  },
  headOptions: [
    { label: 'H1', value: 'H1' },
    { label: 'H2', value: 'H2' },
    { label: 'H3', value: 'H3' }
  ]
}
