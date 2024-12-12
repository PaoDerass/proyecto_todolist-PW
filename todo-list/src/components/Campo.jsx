
const Campo = ({iconName, idCampo, placeholderName, tipoCampo, value, onChange}) => {
    return (
      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className={iconName} />
        </span>
        <input
          value={value}
          onChange={onChange}
          type={tipoCampo}
          id={idCampo}
          className="form-control"
          placeholder={placeholderName}
        />
      </div>
    );
}
export default Campo