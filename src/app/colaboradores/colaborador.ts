export interface Colaborador {
  numeroIdentificacion: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  celular?: string;
  correo?: string;
  direccion?: string;
  telefonoFijo?: string;
  fechaNacimiento?: Date;
  fechaIngreso?: Date;
  genero?: string;
  cargo?: string;
  area?: string;
  riesgoARL?: number;
  tipoContrato?: string;
  profesion?: string;
  escolaridad?: string;
  experienciaAnos?: number;
  salarioBase?: number;
  horasMensualesContratadas?: number;
  formaPago?: string;
  activo: boolean;
}
