import {
  Server,
  Response,
  Model,
  belongsTo,
  hasMany,
  RestSerializer,
} from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  const server = new Server({
    environment,

    models: {
      physician: Model,
      category: Model.extend({
        parent: belongsTo("category", { inverse: null }),
        proposedBy: belongsTo("physician"),
      }),
      variable: Model.extend({
        proposedBy: belongsTo("physician"),
        category: belongsTo(),
      }),
      medicalcase: Model.extend({
        physician: belongsTo(),
        states: hasMany(),
      }),
      state: Model.extend({
        medicalcase: belongsTo(),
        variableValues: hasMany(),
      }),
      variableValue: Model.extend({
        state: belongsTo(),
        variable: belongsTo(),
      }),
    },

    seeds(server) {
      const p = server.create("physician", {
        name: "Vadim Alimguzhin",
      })
      server.create("physician", {
        name: "Toni Mancini",
      })
      const catTop = server.create("category", {
        name: "Vari",
        proposedBy: p,
      })
      const catNumeric = server.create("category", {
        name: "Numerici",
        proposedBy: p,
        parent: catTop,
      })
      const catEnum = server.create("category", {
        name: "Enumerabili",
        proposedBy: p,
        parent: catTop,
      })
      const variables = [
        server.create("variable", {
          proposedBy: p,
          category: catTop,
          name: "Foobar",
          description: "Something",
          type_fa: "action",
          domain: {
            type: "int",
            lb: 10,
            ub: 1000,
            step: 5,
          },
        }),
        server.create("variable", {
          proposedBy: p,
          category: catNumeric,
          name: "Eta",
          description: "Something",
          type_fa: "feature",
          domain: {
            type: "int",
            lb: 20,
            ub: 100,
            step: 1,
          },
        }),
        server.create("variable", {
          proposedBy: p,
          category: catNumeric,
          name: "Altezza",
          description: "Something",
          type_fa: "feature",
          domain: {
            type: "real",
            lb: 150.0,
            ub: 210.0,
            step: 0.1,
          },
        }),
        server.create("variable", {
          proposedBy: p,
          category: catNumeric,
          name: "Peso",
          description: "Something",
          type_fa: "feature",
          domain: {
            type: "real",
            lb: 40.0,
            ub: 120.0,
            step: 0.1,
          },
        }),
        server.create("variable", {
          proposedBy: p,
          category: catEnum,
          name: "Contenuto",
          description: "Something",
          type_fa: "feature",
          domain: {
            type: "enum",
            values: ["Normale", "Delirante"],
          },
        }),
        server.create("variable", {
          proposedBy: p,
          category: catEnum,
          name: "Umore",
          description: "Something",
          type_fa: "feature",
          domain: {
            type: "enum",
            values: ["Eutimico", "Depresso", "Euforico", "Disforico", "Labile"],
          },
        }),
      ]
      const medicalcases = [
        server.create("medicalcase", {
          physician: p,
          active: true,
        }),
        server.create("medicalcase", {
          physician: p,
          active: false,
        }),
      ]
      const states = [
        server.create("state", { medicalcase: medicalcases[0] }),
        server.create("state", { medicalcase: medicalcases[0] }),
        server.create("state", { medicalcase: medicalcases[0] }),
      ]
      server.create("variableValue", {
        state: states[0],
        variable: variables[0],
        value: 10,
      })
      server.create("variableValue", {
        state: states[0],
        variable: variables[2],
        value: 17,
      })
      server.create("variableValue", {
        state: states[1],
        variable: variables[1],
        value: 39,
      })
      server.create("variableValue", {
        state: states[2],
        variable: variables[3],
        value: 1,
      })
      server.create("variableValue", {
        state: states[2],
        variable: variables[4],
        value: 2,
      })
    },

    routes() {
      this.namespace = "api"
      const authCheck = (schema, request, handler) => {
        const userId = request.requestHeaders.user
        if (userId) {
          const p = schema.physicians.find(userId)
          if (p) {
            return handler(schema, request, userId)
          } else {
            return new Response(403)
          }
        } else {
          return new Response(401)
        }
      }
      this.get("/categories", (schema, request) => {
        return authCheck(schema, request, (schema) => schema.categories.all())
      })
      this.post("/categories", (schema, request) => {
        return authCheck(schema, request, (schema, request, userId) => {
          let attrs = JSON.parse(request.requestBody)
          const p = schema.physicians.find(userId)
          const parent = attrs.parent
            ? schema.categories.find(attrs.parent)
            : null
          return schema.categories.create({
            name: attrs.name,
            parent,
            proposedBy: p,
          })
        })
      })
      this.get("/variables", (schema, request) => {
        return authCheck(schema, request, (schema) => schema.variables.all())
      })
      this.post("/variables", (schema, request) => {
        return authCheck(schema, request, (schema, request, userId) => {
          let attrs = JSON.parse(request.requestBody)
          const cat = schema.categories.find(attrs.category)
          const p = schema.physicians.find(userId)
          return schema.variables.create({
            ...attrs,
            category: cat,
            proposedBy: p,
          })
        })
      })
      this.get("/medicalcases", (schema, request) => {
        return authCheck(schema, request, (schema, request, userId) =>
          schema.medicalcases.where((c) => c.physicianId === userId)
        )
      })
      this.get("/medicalcases/:medicalcaseid", (schema, request) => {
        return authCheck(schema, request, (schema, request, userId) => {
          const id = request.params.medicalcaseid
          const medicalcase = schema.medicalcases.find(id)
          if (medicalcase) {
            if (medicalcase.physicianId === userId) {
              return medicalcase
            } else {
              return new Response(403)
            }
          } else {
            return new Response(404)
          }
        })
      })
      this.get("/medicalcases/:medicalcaseid/states", (schema, request) => {
        return authCheck(schema, request, (schema, request, userId) => {
          const id = request.params.medicalcaseid
          const medicalcase = schema.medicalcases.find(id)
          if (medicalcase) {
            return schema.states.where((v) => v.medicalcaseId === id)
          } else {
            return new Response(404)
          }
        })
      })
    },

    serializers: {
      physician: RestSerializer,
      category: RestSerializer.extend({
        embed: true,
        include: ["parent"],
      }),
      variable: RestSerializer.extend({
        embed: true,
        include: ["category"],
        keyForAttribute(attr) {
          return attr
        }
      }),
      medicalcase: RestSerializer.extend({
        embed: true,
        include: ["visits"],
      }),
      visit: RestSerializer.extend({
        embed: true,
        include: ["variableValues"],
      }),
      variableValue: RestSerializer.extend({
        embed: true,
        include: ["variable"]
      }),
    },
  })

  return server
}
