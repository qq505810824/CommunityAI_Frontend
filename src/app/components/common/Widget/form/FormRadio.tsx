import FormControl from '@mui/joy/FormControl';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

interface ViewProps {
    setValue?: any;
}


export default function FormRadio(props: ViewProps) {
    const {
        setValue
    } = props
    return (
        <>
            <FormControl sx={{
                width: '100%'
            }}>
                <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                    <Radio value="outlined" label="Outlined" variant="outlined" />
                    <Radio value="outlined2" label="Outlined" variant="outlined" />
                    <Radio value="outlined3" label="Outlined" variant="outlined" />
                </RadioGroup>
            </FormControl>
        </>
    )
}