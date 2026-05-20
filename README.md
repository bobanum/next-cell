# NextCell _(Not Excel)_

## Principles

### The problems with Excel (and others)

- Infinite rows and columns
- Formulas must be copies to each cell
- Coordinate-based references
- No separation of structure and content
- No separation of data and presentation
- No built-in headers and footers system

### The NextCell approach

- Headings system : headers and footers and leaders and trailers.
- Finite rows and columns
- Inherited formulas (Binder, Sheet, Group, Row, Column, Cell)
- Inherited formats (Binder, Sheet, Group, Row, Column, Cell)
- Named references (Binder, Sheet, Group, Row, Column, Cell)
- Global binder and sheet data. Instead of putting global data in a section of a sheet. Data like Tax rate, currency, etc. can be stored in the sheet properties and referenced by any cell in the sheet.
- Separation of editing data and presentation data. When editing a cell, ... Exemple: Editing a "sex" cell, the user can choose between "M" and "F", but the presentation can be "Male" and "Female". Or a "height" cell can be edited in cm but presented in ft and inches.
- Repeatable headings for each group.
- Collapsable groups.

## Structure

- Binder
  - Sheets
    - Header (column)
      - Rows
    - Footer (column)
      - Rows
    - Leader (row)
      - Columns
    - Trailer (row)
      - Columns
    - Bodies
      - Cells

## Global properties

Properties attribuable to each element

| Property | Description                           |
| -------- | ------------------------------------- |
| id       | Unique identifier for the element     |
| title    | Title of the element                  |
| formula  | Formula associated with the element   |
| format   | Formatting properties for the element |

