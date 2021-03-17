import React from "react";

export const defaultStyle = {
  table: "min-w-full divide-y divide-gray-200",
  thead: "bg-gray-50",
  th:
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  tbody: "bg-white divide-y divide-gray-200",
  tbodyTr: "",
  td: "px-6 py-4 whitespace-nowrap",
  tableWrapper: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg",
};

export const Table = ({
  children,
  className = defaultStyle.table,
  wrapperClassName = defaultStyle.tableWrapper,
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className={wrapperClassName}>
            <table className={className}>{children}</table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Thead = ({ children, className = defaultStyle.thead }) => {
  return <thead className={className}>{children}</thead>;
};

export const Th = ({ children, className = defaultStyle.th }) => {
  return (
    <th scope="col" className={className}>
      {children}
    </th>
  );
};

export const Tbody = ({ children, className = defaultStyle.tbody }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const Td = ({ children, className = defaultStyle.td }) => (
  <td className={`${className} cursor-pointer`}>{children}</td>
);

export const DataViewer = ({ titles, items, styles }) => (
  <Table
    className={styles?.table || defaultStyle.table}
    wrapperClassName={styles?.tableWrapper || defaultStyle.tableWrapper}
  >
    {titles && (
      <Thead className={styles?.thead || defaultStyle.thead}>
        <tr>
          {titles.map((title, idx) => (
            <Th className={styles?.th || defaultStyle.th} key={idx}>
              {title}
            </Th>
          ))}
        </tr>
      </Thead>
    )}
    <Tbody className={styles?.tbody || defaultStyle.tbody}>
      {items.map((item, index) => (
        <tr className={styles?.tbodyTr} key={index}>
          {Object.keys(item).map((key, keyIndex) => (
            <Td className={styles?.td || defaultStyle.td} key={keyIndex}>
              {item[key]}
            </Td>
          ))}
        </tr>
      ))}
    </Tbody>
  </Table>
);

// export default Table;
