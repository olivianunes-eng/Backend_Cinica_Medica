import prisma from "../data/prisma.js";

export const listarConsultas = async (req, res) => {
  try {
    const consultas = await prisma.consulta.findMany({
      include: {
        paciente: true,
        medico: {
          include: {
            especialidade: true,
          },
        },
        usuario: true,
      },
    });

    res.json(consultas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar consultas" });
  }
};

export const buscarConsultaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await prisma.consulta.findUnique({
      where: { id: Number(id) },
      include: {
        paciente: true,
        medico: {
          include: {
            especialidade: true,
          },
        },
        usuario: true,
      },
    });

    if (!consulta) {
      return res.status(404).json({ erro: "Consulta não encontrada" });
    }

    res.json(consulta);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar consulta" });
  }
};

export const criarConsulta = async (req, res) => {
  try {
    const {
      dataConsulta,
      observacao,
      valor,
      pacienteId,
      medicoId,
      usuarioId,
    } = req.body;

    const paciente = await prisma.paciente.findUnique({
      where: { id: Number(pacienteId) },
    });

    if (!paciente) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    const medico = await prisma.medico.findUnique({
      where: { id: Number(medicoId) },
    });

    if (!medico) {
      return res.status(404).json({ erro: "Médico não encontrado" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(usuarioId) },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const consultaExistente = await prisma.consulta.findFirst({
      where: {
        medicoId: Number(medicoId),
        dataConsulta: new Date(dataConsulta),
        status: "AGENDADA",
      },
    });

    if (consultaExistente) {
      return res.status(400).json({
        erro: "Este médico já possui consulta agendada neste dia e horário",
      });
    }

    const consulta = await prisma.consulta.create({
      data: {
        dataConsulta: new Date(dataConsulta),
        observacao,
        status: "AGENDADA",
        valor: valor ?? medico.valorConsulta,
        pacienteId: Number(pacienteId),
        medicoId: Number(medicoId),
        usuarioId: Number(usuarioId),
      },
    });

    res.status(201).json({
      msg: "Consulta agendada com sucesso",
      consulta,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao criar consulta" });
  }
};

export const atualizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      dataConsulta,
      observacao,
      status,
      valor,
      pacienteId,
      medicoId,
      usuarioId,
    } = req.body;

    const consulta = await prisma.consulta.update({
      where: { id: Number(id) },
      data: {
        dataConsulta: dataConsulta ? new Date(dataConsulta) : undefined,
        observacao,
        status,
        valor,
        pacienteId: pacienteId ? Number(pacienteId) : undefined,
        medicoId: medicoId ? Number(medicoId) : undefined,
        usuarioId: usuarioId ? Number(usuarioId) : undefined,
      },
    });

    res.json({
      msg: "Consulta atualizada com sucesso",
      consulta,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar consulta" });
  }
};

export const realizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await prisma.consulta.findUnique({
      where: { id: Number(id) },
    });

    if (!consulta) {
      return res.status(404).json({ erro: "Consulta não encontrada" });
    }

    if (consulta.status === "CANCELADA") {
      return res.status(400).json({
        erro: "Não é possível realizar uma consulta cancelada",
      });
    }

    if (consulta.status === "REALIZADA") {
      return res.status(400).json({
        erro: "Esta consulta já foi realizada",
      });
    }

    const consultaAtualizada = await prisma.consulta.update({
      where: { id: Number(id) },
      data: {
        status: "REALIZADA",
      },
    });

    res.json({
      msg: "Consulta realizada com sucesso",
      consulta: consultaAtualizada,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao realizar consulta" });
  }
};

export const cancelarConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await prisma.consulta.findUnique({
      where: { id: Number(id) },
    });

    if (!consulta) {
      return res.status(404).json({ erro: "Consulta não encontrada" });
    }

    if (consulta.status === "REALIZADA") {
      return res.status(400).json({
        erro: "Não é possível cancelar uma consulta realizada",
      });
    }

    if (consulta.status === "CANCELADA") {
      return res.status(400).json({
        erro: "Esta consulta já foi cancelada",
      });
    }

    const consultaAtualizada = await prisma.consulta.update({
      where: { id: Number(id) },
      data: {
        status: "CANCELADA",
      },
    });

    res.json({
      msg: "Consulta cancelada com sucesso",
      consulta: consultaAtualizada,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cancelar consulta" });
  }
};

export const deletarConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.consulta.delete({
      where: { id: Number(id) },
    });

    res.json({ msg: "Consulta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar consulta" });
  }
};