import { ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'
import Actions from '../action'
import Types from '../action/type'

const initAppEpic = action => {
  return action.pipe(
    ofType(Types.INIT_APP),
    switchMap(() => {
      const appTheme = 'dark'
      return [
        Actions.updateData(null, {
          appTheme
        })
      ]
    })
  )
}

export default {
  initAppEpic
}
