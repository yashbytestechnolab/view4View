
export const Expected = (...props: any) => {
    let yup: Array<object | undefined> = []
    for (let i = props[0]; i < props[1]; i = i + props[2]) {
        yup.push({ label: i.toString(), value: i })
    }
    return yup
}