export interface TabsModel {
    route?: string;
    name?: string;
    title?: string;
    meta?: {icon: string; title: string; noCache?: boolean};
}

export interface RouteModel extends TabsModel {
    path: string;
    component: any;
    redirect?: string;
    children?: RouteModel[];
}
