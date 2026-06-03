import prisma from "../data/prisma.js";

export const listarPacientes = async (req, res) => {
  try {
    const pacientes = await prisma.paciente.findMany();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar pacientes" });
  }
};

export const buscarPacientePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const paciente = await prisma.paciente.findUnique({
      where: { id: Number(id) },
    });

    if (!paciente) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar paciente" });
  }
};

export const criarPaciente = async (req, res) => {
  try {
    const { nome, cpf, dataNascimento, telefone, email, endereco } = req.body;

    const paciente = await prisma.paciente.create({
      data: {
        nome,
        cpf,
        dataNascimento: new Date(dataNascimento),
        telefone,
        email,
        endereco,
      },
    });

    res.status(201).json({
      msg: "Paciente criado com sucesso",
      paciente,
    });
  } catch (error) {
      console.log(error);
      
      res.status(500).json({
        erro: "Erro ao criar paciente",
        detalhes: error.message
  });
  }
};

export const atualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, dataNascimento, telefone, email, endereco } = req.body;

    const paciente = await prisma.paciente.update({
      where: { id: Number(id) },
      data: {
        nome,
        cpf,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        telefone,
        email,
        endereco,
      },
    });

    res.json({
      msg: "Paciente atualizado com sucesso",
      paciente,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar paciente" });
  }
};

export const deletarPaciente = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.paciente.delete({
      where: { id: Number(id) },
    });

    res.json({ msg: "Paciente deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar paciente" });
  }
};