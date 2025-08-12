import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import ReactTable from "react-table"
import DOMPurify from 'dompurify'
import { makeData } from "./TableData"

class EditableTabel extends React.Component {
  state = {
    data: makeData()
  }

  renderEditable = cellInfo => {
    const cellValue = this.state.data[cellInfo.index][cellInfo.column.id];
    
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data]
          // Sanitize input to prevent XSS attacks
          const sanitizedValue = DOMPurify.sanitize(e.target.innerHTML, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
            ALLOWED_ATTR: []
          });
          data[cellInfo.index][cellInfo.column.id] = sanitizedValue
          this.setState({ data })
        }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(cellValue || '', {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
            ALLOWED_ATTR: []
          })
        }}
      />
    )
  }

  render() {
    const { data } = this.state

    return (
      <Card>
        <CardHeader>
          <CardTitle>Editable</CardTitle>
        </CardHeader>
        <CardBody>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "First Name",
                accessor: "firstName",
                Cell: this.renderEditable
              },
              {
                Header: "Last Name",
                accessor: "lastName",
                Cell: this.renderEditable
              },
              {
                Header: "Full Name",
                id: "full",
                accessor: d => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        (d.firstName || '') + " " + (d.lastName || ''), {
                          ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
                          ALLOWED_ATTR: []
                        }
                      )
                    }}
                  />
                )
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </CardBody>
      </Card>
    )
  }
}
export default EditableTabel
