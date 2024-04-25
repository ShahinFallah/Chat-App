const showNameInProfile = (name) => {
    const fullName = name.split(" ")
    const result = fullName.length > 1 ? `${fullName[0].charAt(0)}${fullName[1].charAt(0)}` : fullName[0].charAt(0)
    return result.toUpperCase()
}

export default showNameInProfile