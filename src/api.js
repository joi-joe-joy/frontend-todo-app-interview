export async function callTodosApi(apiKey) {
  const response = await fetch("https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos", {
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  return await response.json();
}

export async function addTodo(apiKey, Text) {
  const data = {
    records: [
      {
      fields: {
          Status: "Todo",
          Tags: "[\"tag1\"]",
          Text
        }
      }
    ]
  }
  
  const response = await fetch("https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos", {
    headers: {
      "X-Api-Key": apiKey,
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function setCheckedTodo({apiKey, checked, id}) {
  const data = {
    records: [
      {
        id,
        fields: {
          Status: checked ? "Done" : "Todo"
        }
      }
    ]
  }
  
  const response = await fetch("https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos", {
    headers: {
      "X-Api-Key": apiKey,
    },
    method: 'PATCH',
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function addTag({apiKey, tags, id}) {
  const data = {
    records: [
      {
        id,
        fields: {
          Tags: JSON.stringify(tags)
        }
      }
    ]
  }
  
  const response = await fetch("https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos", {
    headers: {
      "X-Api-Key": apiKey,
    },
    method: 'PATCH',
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function deleteTodo(apiKey, id) {
  const response = await fetch(`https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos?records[]=${id}`, {
    headers: {
      "X-Api-Key": apiKey,
    },
    method: 'DELETE',
  });
  return await response.json();
}