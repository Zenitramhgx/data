import { coreDB, dataDB } from '../database/connection';
import { QueryTypes } from 'sequelize';
import { queries } from '../database/estudianteQueries';
import { EstudianteType } from '../models/estudianteModel'

export const getIdEstudianteData = async (control: string) => {
    try {
        const IdEstudiante = await dataDB.query(queries.getIdEstudianteData, {
            type: QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        }) as { id: string }[];
        return IdEstudiante.length > 0 ? IdEstudiante[0].id : null;
    } catch (error) {
        console.error("Error obteniendo el ID del estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getEstudianteData = async (idReq: string) => {
    try {
        const estudiante = await dataDB.query(queries.getEstudianteData, {
            type: QueryTypes.SELECT,
            replacements: {
                id: idReq
            }
        }) as { estudiante: EstudianteType }[];

        return estudiante;
    } catch (error) {
        console.error("Error obteniendo el data.estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};

export const getEstudianteCore = async (control: string): Promise<EstudianteType> => {
    try {
        const estudiantes = await coreDB.query(queries.getEstudianteCore, {
            type: QueryTypes.SELECT,
            replacements: {
                ncontrol: control
            }
        }) as EstudianteType[]; // Tipar el resultado como un array de objetos de tipo EstudianteType

        return estudiantes[0]; // Retorna el primer estudiante si existe

    } catch (error) {
        console.error("Error obteniendo el core.estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
};


export const setEstudianteData = async (estudiante: EstudianteType) => {
    try {
        await dataDB.query(queries.setEstudianteData, {
            type: QueryTypes.INSERT,
            replacements: {
                nocontrol: estudiante.nocontrol,
                curp: estudiante.curp,
                lugarNacimiento: estudiante.lugarNacimiento,
                nombre: estudiante.nombre,
                primerApellido: estudiante.primerApellido,
                segundoApellido: estudiante.segundoApellido,
                seguro: estudiante.seguro,
                genero: estudiante.genero,
                celular: estudiante.celular,
                correo: estudiante.correo,
                indigena: estudiante.indigena
            }
        })
        const idEstudiante = getIdEstudianteData(estudiante.nocontrol);
        return idEstudiante;
    } catch (error) {
        console.error("Error al INSERTAR el estudiante:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
}