import prisma from "../data/prisma.js";

export const listarMedicos = async (req, res) => {
  try {
    const medicos = await prisma.medico.findMany({
      include: {
        especialidade: true,
      },
    });

    res.json(medicos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar médicos",
    });
  }
};

export const buscarMedicoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const medico = await prisma.medico.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        especialidade: true,
      },
    });

    if (!medico) {
      return res.status(404).json({
        erro: "Médico não encontrado",
      });
    }

    res.json(medico);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar médico",
    });
  }
};

export const criarMedico = async (req, res) => {
  try {
    const {
      nome,
      crm,
      telefone,
      email,
      valorConsulta,
      especialidadeId,
    } = req.body;

    const crmExiste = await prisma.medico.findUnique({
      where: {
        crm,
      },
    });

    if (crmExiste) {
      return res.status(400).json({
        erro: "CRM já cadastrado",
      });
    }

    const medico = await prisma.medico.create({
      data: {
        nome,
        crm,
        telefone,
        email,
        valorConsulta,
        especialidadeId,
      },
    });

    res.status(201).json({
      msg: "Médico criado com sucesso",
      medico,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      erro: "Erro ao criar médico",
    });
  }
};

export const atualizarMedico = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nome,
      crm,
      telefone,
      email,
      valorConsulta,
      especialidadeId,
    } = req.body;

    const medico = await prisma.medico.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        crm,
        telefone,
        email,
        valorConsulta,
        especialidadeId,
      },
    });

    res.json({
      msg: "Médico atualizado com sucesso",
      medico,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao atualizar médico",
    });
  }
};

export const deletarMedico = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.medico.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      msg: "Médico deletado com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar médico",
    });
  }
};