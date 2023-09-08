
export const getTasks=async(req,res, next)=>{
  res.send('Reading all Tasks');
}

export const getTask=async(req,res, next)=>{
  res.send('Reading one Task');
}

export const createTask=async(req,res, next)=>{
  res.send('Creating one Task');
}

export const updateTask=async(req,res, next)=>{
  res.send('Updating one Task');
}

export const deleteTask=async(req,res, next)=>{
  res.send('Deleting one Task');
}
