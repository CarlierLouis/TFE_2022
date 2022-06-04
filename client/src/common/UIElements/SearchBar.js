import React, { useEffect, useState} from 'react';

const SearchBar = ({list, setList, filterField = item => item, ...props }) => {
    const [value, setValue] = useState()

    useEffect(() => {
        if (value) {
            setList(filterList())
        }
        else {
            setList(list)
        }
    }, [value])

    const filterList = () => {
        return list.filter(item => filterField(item).toLowerCase().includes(value.toLocaleLowerCase()))
    }

    const handleChange = event => {
        setValue(event.target.value)
    }

    return (
        <input type='text' placeholder='Rechercher...' name="search" onChange={handleChange} value={value} {...props} />
    )
}

export default SearchBar;