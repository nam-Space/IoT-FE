import React, { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";

export function DebounceSelect({
    fetchOptions,
    debounceTimeout = 800,
    value,
    ...props
}) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    const handleOnFocus = () => {
        //fetching init data when focus to input
        if (options && options.length > 0) {
            return;
        }
        fetchOptions("").then((newOptions) => {
            setOptions([...options, ...newOptions]);
        });
    };

    const handleOnBlur = () => {
        setOptions([]);
    };

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
        />
    );
}
