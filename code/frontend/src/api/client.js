// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

const url = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ""
}/${process.env.REACT_APP_BASE_PATH}/api`

export async function client(
  endpoint,
  method,
  { query, body, ...customConfig } = {}
) {

  const config = {
    method,
    ...customConfig,
    headers: {
      ...customConfig.headers,
    },
  }

  if (body instanceof File) {
    config.body = body
    config.headers["Filename"] = body.name
    config.headers["Content-Type"] = body.type
  }

  const queryString = query ? new URLSearchParams(query).toString() : ""

  let data
  try {
    const response = await window.fetch(
      url + endpoint + "?" + queryString,
      config
    )
    const contentType = response.headers.get("content-type")
    if (
      contentType &&
      contentType.includes("application/json") &&
      response.status !== 204
    ) {
      data = await response.json()
    }
    if (response.ok) {
      return data
    }
    let msg = response.statusText
    if (data.message) {
      msg += "\n"
      if (typeof data.message === "object") {
        const fields = []
        for (const [key, value] of Object.entries(data.message)) {
          fields.push(`${key}: ${value}`)
        }
        msg += fields.join("\n")
      }
      else {
        msg += data.message
      }
    }
    throw new Error(msg)
  } catch (err) {
    return Promise.reject(err.message)
  }
}

client.get = function (endpoint, query, customConfig = {}) {
  return client(endpoint, "GET", { ...customConfig, query })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, "POST", { ...customConfig, body })
}

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, "PUT", { ...customConfig, body })
}

client.patch = function (endpoint, body, customConfig = {}) {
  return client(endpoint, "PATCH", { ...customConfig, body })
}

client.delete = function (endpoint, customConfig = {}) {
  return client(endpoint, "DELETE", { ...customConfig })
}
