import jwt from "jsonwebtoken";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar usuários",
    });
  }
};

export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!usuario) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar usuário",
    });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;

    const usuarioExiste = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (usuarioExiste) {
      return res.status(400).json({
        erro: "Já existe usuário com este email",
      });
    }

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        perfil,
      },
    });

    res.status(201).json({
      msg: "Usuário criado com sucesso",
      usuario,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      erro: "Erro ao criar usuário",
    });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const { nome, email, senha, perfil } = req.body;

    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        email,
        senha,
        perfil,
      },
    });

    res.json({
      msg: "Usuário atualizado com sucesso",
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao atualizar usuário",
    });
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      msg: "Usuário deletado com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar usuário",
    });
  }
};

