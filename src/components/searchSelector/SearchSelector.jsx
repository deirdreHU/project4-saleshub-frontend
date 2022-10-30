import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function SearchSelector({
        label,
        options,
        onChange,
        multiple = false
}) 
    
{
    return (

        <div >

            <Autocomplete
                multiple={multiple}
                id="checkboxes-tags-demo"
                options={options}
                onChange={(_, value) => {
                    onChange && onChange(value);
                }}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                    variant={'standard'}
                    {...params}
                    label={label} placeholder={label} />
                )}
            />

        </div>
        
    )
}

export default SearchSelector;