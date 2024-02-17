
const CustomDateTime = ({ onChange, name, defaultData, dateType }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  console.log(defaultData)
  return (
    <div>
      <input
      key={defaultData}
        style={{
          width: "100%",
          padding: "5px 15px",
          borderRadius: "5px",
        }}
        width={"100%"}
        name={name}
        type={dateType || "datetime-local"}
        defaultValue={defaultData}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomDateTime;
