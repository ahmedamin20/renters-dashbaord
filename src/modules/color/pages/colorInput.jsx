import React,{useState} from 'react'
import { MuiColorInput } from 'mui-color-input'

const ColorInput = ({ setColorValue, setValueFeild, defaultValue }) => {
    console.log(defaultValue)
  const [value, setValue] = useState(defaultValue)

  const handleChange = (newValue) => {
      setValue(newValue)
      setColorValue(newValue)
      setValueFeild("code",newValue)
      
  }

  return <MuiColorInput fullWidth format="hex" value={value} onChange={handleChange} />
}
export default ColorInput