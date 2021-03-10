
// This class's Map method copies the properties of the source's object into the target's object
// only if the properties exists in both objects.

export class AutoMap {

    constructor() { };

    public static Map(target, source) {

        Object.assign(
            target,
            ...Object.keys(target).map(
                (key) => ({ [key]: target[key] })
            ),
            ...Object.keys(target).map(
                (key) => ({ [key]: source[key] })
            )
        );

        return target;
    }
}