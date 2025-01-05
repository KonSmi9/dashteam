import { Checkbox, DatePicker, Layout, Table, theme, Typography } from 'antd';
import Splitter from 'antd/es/splitter';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';

const { RangePicker } = DatePicker;
const { Content } = Layout;

interface RecordType {
    id: number;
    group: string;
    firstName: string;
    lastName: string;
    birthDate: string;
}

// Генерация случайной даты рождения
const getRandomBirthDate = (): string => {
    const startYear = 1999;
    const endYear = new Date().getFullYear();
    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const randomMonth = Math.floor(Math.random() * 12);
    const randomDay = Math.floor(Math.random() * 28) + 1;
    return new Date(randomYear, randomMonth, randomDay).toISOString().split('T')[0];
};

// Генерация данных с группировкой по 2 строки
const generateData = (count: number): RecordType[] => {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        group: `Group ${Math.ceil((index + 1) / 2)}`, // Каждые 2 записи в одну группу
        firstName: `First_${index + 1}`,
        lastName: `Last_${index + 1}`,
        birthDate: getRandomBirthDate(),
    }));
};

export const TablePage: React.FC = () => {
    const [data] = useState<RecordType[]>(generateData(100));
    const [visibleColumns, setVisibleColumns] = useState<string[]>([
        'group',
        'id',
        'firstName',
        'lastName',
        'birthDate',
    ]);
    const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

    // Фильтрация данных по дате рождения
    const filteredData = useMemo(() => {
        if (!dateRange[0] || !dateRange[1]) {
            return data;
        }
        const [start, end] = dateRange.map((date) => new Date(date!));
        return data.filter((record) => {
            const birthDate = new Date(record.birthDate);
            return birthDate >= start && birthDate <= end;
        });
    }, [data, dateRange]);

    // Функция для обработки rowSpan (группировка)
    const getRowSpan = (data: RecordType[], index: number, field: keyof RecordType) => {
        if (index === 0 || data[index][field] !== data[index - 1][field]) {
            let rowSpan = 1;
            for (let i = index + 1; i < data.length; i++) {
                if (data[i][field] === data[index][field]) {
                    rowSpan++;
                } else {
                    break;
                }
            }
            return rowSpan;
        }
        return 0;
    };

    // Определение всех возможных колонок
    const columns: ColumnsType<RecordType> = [
        {
            title: 'Group',
            dataIndex: 'group',
            key: 'group',
            width: 150,
            render: (_, record, index) => ({
                children: record.group,
                props: {
                    rowSpan: getRowSpan(filteredData, index, 'group'),
                },
            }),
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 150,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: 150,
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthDate',
            key: 'birthDate',
            width: 150,
        },
    ];

    // Фильтруем видимые колонки
    const filteredColumns = useMemo(() => {
        return columns.filter((col) => visibleColumns.includes(col.key as string));
    }, [visibleColumns, columns]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Splitter style={{ height: '100vh', background: colorBgContainer }}>
            {/* Левая панель */}
            <Splitter.Panel collapsible>
                <div style={{ padding: '16px', height: '100%' }}>
                    <Typography.Title level={5}>Настройка столбцов</Typography.Title>
                    <Checkbox.Group
                        options={columns.map((col) => ({
                            label: typeof col.title === 'string' ? col.title : String(col.title),
                            value: col.key,
                        }))}
                        defaultValue={visibleColumns}
                        onChange={(checkedValues) => setVisibleColumns(checkedValues as string[])}
                    />
                    <Typography.Title level={5} style={{ marginTop: '16px' }}>
                        Фильтр по дате рождения
                    </Typography.Title>
                    <RangePicker
                        onChange={(dates) => {
                            const [start, end] = dates || [];
                            setDateRange([start?.format('YYYY-MM-DD') || null, end?.format('YYYY-MM-DD') || null]);
                        }}
                        style={{ width: '100%' }}
                    />
                </div>
            </Splitter.Panel>

            {/* Таблица */}
            <Splitter.Panel>
                <Content style={{ padding: '16px' }}>
                    <Table<RecordType>
                        rowKey="id"
                        dataSource={filteredData}
                        columns={filteredColumns}
                        bordered
                        scroll={{ y: 400 }} // Вертикальный скролл
                    />
                </Content>
            </Splitter.Panel>
        </Splitter>
    );
};
