import React from 'react'
import { createRef } from 'react'
import cx from 'classnames'
import Icon from './icon'

function Table(props) {
  const { className, column, data } = props
  const btnClass = cx('scrollbar-x', className)
  const scrollRef = createRef()
  const rowHeight = '28px'
  const tableScroll = () => {
    console.log(scrollRef.current.scrollTop)
  }
  return (
    <div className="scrollbar-x">
      <div style={{ marginRight: data.length > 14 ? 10 : 0 }}>
        <table className="table">
          <thead className="table-header">
            <tr style={{ height: '32px' }}>
              {column.map((item, index) => {
                return (
                  <th key={index} style={{ width: item.width, minWidth: item.minWidth }}>
                    <span>{item.headerName}</span>
                    <Icon type='arrow_up' className="icon-padding"></Icon>
                  </th>
                )
              })}
            </tr>
          </thead>
        </table>
      </div>
      <div className="scrollbar-y" ref={scrollRef} style={{ height: '392px' }} onScroll={tableScroll}>
        <table className="table">
          <tbody className="table-body">
            {
              data.map((row, index) => {
                return (
                  <tr key={index} style={{ height: rowHeight, width: '100%' }}>
                    {
                      column.map((item, key) => {
                        return (
                          <td key={key} style={{ display: 'inline-block', width: item.width, minWidth: item.minWidth, boxShadow: 'none' }}>
                            {row[item.field]}
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Table