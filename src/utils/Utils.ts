export default class Utils {
    public static getKeyValue = (key: string | number) => (obj: Record<string, any>) => obj[key];
}
