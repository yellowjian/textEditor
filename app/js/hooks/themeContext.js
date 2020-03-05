import { createContext } from 'react'
import THEMECONFIG from '../utils/themeConstants'

const ThemeContext = createContext(THEMECONFIG['light'])
export default ThemeContext