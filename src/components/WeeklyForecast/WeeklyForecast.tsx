
import Panel from 'components/Panel/Panel'
import styles from './WeeklyForecast.module.css';
import { useEffect, useState } from 'react';
import { fetchSevenDaysForecastData } from 'services/useApi';
import { WeatherType } from 'types';
import { createColumnHelper, useReactTable, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { formatDate } from 'utils';

export type Day = {
  datetime: string;
  weather: WeatherType;
  temp: number;
  max_temp: number;
  min_temp: number;
  wind_spd: number;
};

const columnHelper = createColumnHelper<Day>();

export const WeeklyForecast = ({ userLocation }: { userLocation: any }) => {
  const [historicalData, setHistoricalData] = useState();
  const [error, setError] = useState();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    if (!userLocation) {
      return;
    }
    (async function () {
      const { data, error } = await fetchSevenDaysForecastData(userLocation)
      if (data) {
        setHistoricalData(data)
      }

      if (error) {
        setError(error);
      }
    })()
  }, []);

  const columns = [
    columnHelper.accessor('datetime', {
      id: 'datetime',
      header: () => <p className={styles.headerText}>Date</p>,
      cell: (info: any) => (
        <div className={styles.cellText}>
          {info.getValue() && formatDate(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('weather', {
      id: 'weather',
      header: () => <p className={styles.headerText}>Current Weather</p>,
      cell: (info: any) => (
        <div className={styles.iconContainer}>
          {info.getValue() && info.getValue().icon ? (
            <img
              className={styles.icon}
              src={`https://www.weatherbit.io/static/img/icons/${info.getValue() && info.getValue().icon}.png`}
              alt=''
            />
          ) : (
            <img
              className={styles.icon}
              src='/faveIcon.png'
              alt=''
            />
          )}
        </div>
      ),
    }),
    columnHelper.accessor('temp', {
      id: 'temp',
      header: () => <p className={styles.headerText}>Temperature</p>,
      cell: (info) => (
        <p className={`${styles.cellText} ${info.getValue() > 0 ? styles.textRed : styles.textBlue}`}>
          {info.getValue()} °C
        </p>
      ),
    }),
    columnHelper.accessor('max_temp', {
      id: 'max_temp',
      header: () => <p className={`${styles.headerText} text-uppercase`}>Max Temperature</p>,
      cell: (info) => (
        <p className={`${styles.cellText} ${info.getValue() > 0 ? styles.textRed : styles.textBlue}`}>
          {info.getValue()} °C
        </p>
      ),
    }),
    columnHelper.accessor('min_temp', {
      id: 'min_temp',
      header: () => <p className={`${styles.headerText} text-uppercase`}>Min Temperature</p>,
      cell: (info) => (
        <p className={`${styles.cellText} ${info.getValue() > 0 ? styles.textRed : styles.textBlue}`}>
          {info.getValue()} °C
        </p>
      ),
    }),
    columnHelper.accessor('wind_spd', {
      id: 'wind_spd',
      header: () => <p className={`${styles.headerText} text-uppercase`}>Wind Speed</p>,
      cell: (info) => (
        <p className={styles.cellText}>
          {info.getValue()} m/s
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data: historicalData?.data,
    columns,
    state: { columnFilters, globalFilter },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!historicalData) {
    if (error) {
      return <p>{error}</p>
    }

    return null;
  }
  return (
    <Panel className={styles.wrapper}>
      <Panel>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={styles.rowBorder}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={styles.headerCell}
                    >
                      <div className={styles.headerContent}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </Panel>
  )
}
