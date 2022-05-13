const userModel = require("../models/users.models");
const { success, failed } = require("../helper/response");
const userController = {
  showAllUser: async (req, res) => {
    try {
      const { sortField, sortType, page, limit } = req.query;
      const field = sortField || "name";
      const type = sortType === "DESC" ? sortType : "ASC";
      const getPage = page ? Number(page) : 1;
      const limitPage = limit ? Number(limit) : 2;
      const offset = (getPage - 1) * limitPage;
      const allData = await userModel.allData();
      const totalData = Number(allData.rows[0].total);
      userModel
        .showAllUser(field, type, limitPage, offset)
        .then((result) => {
          const pagination = {
            page: getPage,
            data_perPage: limitPage,
            total_data: totalData,
          };
          success(res, result.rows, "success", "get user success", pagination);
        })
        .catch((err) => {
          failed(res, err, "error", "an error has occured");
        });
    } catch (err) {
      failed(res, err, "error", "an error has occured");
    }
  },
  updateData: (req, res) => {
    try {
      const { name, email, phone } = req.body;
      let image = req.file;
      if (!image) {
        image = req.APP_DATA.tokenDecoded.image;
      }
      const id = req.params.id;
      if (!name) {
        throw Error("Nama harus diisi");
      }
      if (!email) {
        throw Error("Email harus diisi");
      }
      if (!phone) {
        throw Error("Nomor telepon harus diisi");
      }
      userModel
        .updateData(id, name, email, phone, image)
        .then((result) => {
          if (result.rowCount > 0) {
            success(res, null, "success", "update data sukses!");
          } else {
            failed(res, "id not found", "error", "data tidak ditemukan");
          }
        })
        .catch((err) => {
          failed(res, err, "error", "an error has occured");
        });
    } catch (err) {
      failed(res, null, "error", err.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = await req.params.id;
      if (!id) {
        throw Error("ID harus diisi");
      }
      userModel
        .deleteUser(id)
        .then((result) => {
          if (result.rowCount > 0) {
            success(res, null, "success", "berhasil menghapus user!");
          } else {
            failed(res, "id not found", "error", "data tidak ditemukan");
          }
        })
        .catch((err) => {
          failed(res, err, "error", "an error has occured");
        });
    } catch (err) {
      failed(res, null, "error", err.message);
    }
  },
  detailUser: async (req, res) => {
    try {
      const id = await req.params.id;
      if (!id) {
        throw Error("ID harus diisi");
      }
      userModel.detailUser(id).then((result) => {
        if (result.rowCount > 0) {
          success(res, result.rows, "success", "menampilkan data user sukses");
        } else {
          failed(res, "id not found", "error", "data tidak ditemukan");
        }
      });
    } catch (err) {
      failed(res, null, "error", err.message);
    }
  },
};
module.exports = userController;
