

const LayoutSetting = ({LayoutImg,name,value,handleChange,pickedValue}) => {
  return (
    <span className="flex my-2 space-x-1">
                <input
                  type="radio"
                  name={name}
                  id={name}
                  value={value}
                  onChange={handleChange}
                  checked={pickedValue === value}
                />
                <img src={LayoutImg} />
              </span>
  )
}

export default LayoutSetting