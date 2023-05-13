import ExecuteQuery from "@/scripts/db";

export default async (req, res) => {
  const { fname,lname, spec } = req.body;
  const query = `SELECT * FROM doctors WHERE fname LIKE '${fname}' AND lname LIKE '${lname}' AND specialization = '${spec}'`;
  const result = await ExecuteQuery(query);
  res.status(200).json(result);
};
