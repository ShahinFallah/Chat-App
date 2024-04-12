
function Gender() {
    return (
        <div className="flex space-x-3">
            <div className="form-control my-2 mb-3">
                <label className="label cursor-pointer">
                    <span className="mr-1 text-sm">Male</span>
                    <input type="checkbox" defaultChecked className="checkbox" />
                </label>
            </div>
            <div className="form-control my-2 mb-3">
                <label className="label cursor-pointer">
                    <span className="mr-1 text-sm">Female</span>
                    <input type="checkbox" defaultChecked className="checkbox" />
                </label>
            </div>
        </div>
    )
}

export default Gender