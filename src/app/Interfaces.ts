export interface Cliente{
    id: number;
    ruc: string;
    dni: string;
    nombre: string;
    aPaterno: string;
    aMaterno: string;
    telefono: string;
    correo: string;
    tienePedidos: Pedido[];
    tieneFacturas: Factura[]
}

export interface Factura{
    id: number;
    codigo: string;
    fechaEmision: Date;
    montoTotal: number;
    perteneceCliente: Cliente;
    pertenecePedido: Pedido
}

export interface Pedido{
    id: number;
    codigo: string;
    fechaEmision: Date;
    fechaVencimiento: Date;
    estado: string
    tieneFactura: Factura;
    tieneDetalles: DetallePedido[];
}

export interface DetallePedido{
    id: number;
    cantidad: number;
    monto: number;
    pertenecePedido: Pedido;
    contieneDetallesDeAtencion: DetalleAtencion[];
}

export interface DetalleAtencion{
    id: number;
    cantidad: number;
    estaIndluidoEnDetallePedido: DetallePedido;
    provieneDeLote: Lote;
}

export interface Lote{
    id: number;
    cantidad: number;
    fechaVenc: Date;
    estaIncluidoEnDetallesDeAtencion: DetalleAtencion[];
    productoId: number;
}

export interface Producto{
    id: number;
    codigo: string;
    nombre: string;
    detalles: string;
    precio: number;
    estaIncluidoEnLotes: Lote[];
}
export let Facturas: Factura[]=[];
export let Pedidos: Pedido[]=[];
export let DetallesDelPedido: DetallePedido[]=[];
export let DetallesDeAtencion: DetalleAtencion[]=[];

//Interfaces alternativas
export interface Pedido2{
    supermercado: string
    producto: string
    cantidad: number
    fecha: string
}

export interface Factura2 {
    codigo: string
    DNI: string
    supermercado: string
    formaPay: string
    fecha: string
    descripcion: string
    importe:string
}
