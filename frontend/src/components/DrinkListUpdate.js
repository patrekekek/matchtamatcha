
const DrinkListUpdate = ({ name, checked, onChange }) => {

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    name={name}
                    value={name}
                    checked={checked}
                    onChange={onChange}
                />
                <p>{name}</p>
            </label>
        </div>
    )
}

export default DrinkListUpdate;