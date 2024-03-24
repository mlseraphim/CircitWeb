import { useEffect, useState } from "react";
import { IDataDisplayProps, IDataRowMetaData } from "../Infrastructure/Interfaces";
import { EnumAttributeType, EnumDataDisplayGroup } from "../Infrastructure/Enums";
import { GetAttribute } from "../Infrastructure/Decorators";
import React from "react";

const DataDisplay = <T extends {}>(props: IDataDisplayProps<T>) => {
    const noGroupAssigned: number = 1000;
    
    const [orderedRowMetaData, setOrderedRowMetaData] = useState<Array<IDataRowMetaData>>([]);


    useEffect(() => {
        setOrderedRowMetaData(() => getOrderedRowMetaData(props.data as T));

    }, [props.refreshData]);


    const getOrderedRowMetaData = (row: T): Array<IDataRowMetaData> => {
        const results: Array<IDataRowMetaData> = [];

        let distinctGroups: Array<EnumDataDisplayGroup> = [];
        let sortedResults: Array<IDataRowMetaData> = [];

        for (let key of Object.keys(row)) {
            const keyAsString: string = key.toString();
            const groupValue = GetAttribute(EnumAttributeType.MetaDataKeyGridGroup, row, keyAsString);

            const rowMetaData: IDataRowMetaData = {
                Heading: GetAttribute(EnumAttributeType.MetaDataKeyPropHeading, row, keyAsString),
                Group: (groupValue === undefined ? noGroupAssigned : +groupValue),
                Order: +GetAttribute(EnumAttributeType.MetaDataKeyGridOrder, row, keyAsString),
                FieldName: keyAsString
            };

            if (rowMetaData.Heading !== undefined) {
                results.push(rowMetaData);

                if (!distinctGroups.includes(rowMetaData.Group)) {
                    distinctGroups.push(rowMetaData.Group);
                }
            }
        }

        distinctGroups.sort((a, b) => (a > b) ? 1 : -1);

        distinctGroups.forEach(g => {
            const currGroupResults = results.filter(r => r.Group === g);
            currGroupResults.sort((a, b) => (a.Order > b.Order) ? 1 : -1);

            sortedResults = [...sortedResults, ...currGroupResults];
        });

        return sortedResults;
    };

    const renderComponent = (): React.ReactElement => {
        const containerClassName: string = (props.className) ? `dataDisplay ${ props.className }` : 'dataDisplay';

        return (
            <div className={ containerClassName }>
                { props.heading && <h2>{ props.heading }</h2> }
                { renderRow() }
            </div>
        );
    };

    const renderRow = (): React.ReactNode => {
        let currentGroup: number = noGroupAssigned;

        return (
            <>
                { orderedRowMetaData.map((d, i) => {
                    const startGroup: boolean = (d.Group !== currentGroup);
                    
                    currentGroup = d.Group;
                    
                    const cssClassName = `metaRow_${ d.Group }`;

                    return (
                        <React.Fragment key={ `dd${ i }` }>
                            { startGroup && <h5 className={ cssClassName }>{ EnumDataDisplayGroup[d.Group].replace('_', ' ') }</h5> }

                            <div className={ cssClassName }>
                                <label>{ d.Heading }:</label>
                                <span>{ getRowField(props.data[d.FieldName as keyof T]) }</span>
                            </div>
                        </React.Fragment>
                    );
                })}
            </>
        );
    };

    const getRowField = (inp: any) => {
        return inp as string;
    }



    return (
        <>
            { renderComponent() }
        </>
    );
};

export default DataDisplay;