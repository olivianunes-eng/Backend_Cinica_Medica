import prisma from "../data/prisma.js";

export const listarEspecialidades = async (req, res) => {
  try {
    const especialidades = await prisma.especialidade.findMany();

    res.json(especialidades);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar especialidades",
    });
  }
};

export const buscarEspecialidadePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const especialidade = await prisma.especialidade.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!especialidade) {
      return res.status(404).json({
        erro: "Especialidade não encontrada",
      });
    }

    res.json(especialidade);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar especialidade",
    });
  }
};

export const criarEspecialidade = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    const especialidadeExiste = await prisma.especialidade.findUnique({
      where: {
        nome,
      },
    });

    if (especialidadeExiste) {
      return res.status(400).json({
        erro: "Especialidade já cadastrada",
      });
    }

    const especialidade = await prisma.especialidade.create({
      data: {
        nome,
        descricao,
      },
    });

    res.status(201).json({
      msg: "Especialidade criada com sucesso",
      especialidade,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      erro: "Erro ao criar especialidade",
    });
  }
};

export const atualizarEspecialidade = async (req, res) => {
  try {
    const { id } = req.params;

    const { nome, descricao } = req.body;

    const especialidade = await prisma.especialidade.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        descricao,
      },
    });

    res.json({
      msg: "Especialidade atualizada com sucesso",
      especialidade,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao atualizar especialidade",
    });
  }
};

export const deletarEspecialidade = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.especialidade.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      msg: "Especialidade deletada com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar especialidade",
    });
  }
};