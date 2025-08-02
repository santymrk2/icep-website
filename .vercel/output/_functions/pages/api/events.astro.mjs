import { Client } from '@notionhq/client';
import { c as createInvalidVariablesError, g as getEnv$1, s as setOnSetGetEnv } from '../../chunks/runtime_CDuzRgYY.mjs';
export { renderers } from '../../renderers.mjs';

const schema = {"NOTION_API_KEY":{"context":"server","access":"secret","type":"string"},"DATABASE_ID":{"context":"server","access":"public","type":"string"},"GOOGLE_API_KEY":{"context":"server","access":"secret","type":"string"},"SITE":{"context":"server","access":"public","type":"string"}};

function getEnvFieldType(options) {
  const optional = options.optional ? options.default !== void 0 ? false : true : false;
  let type;
  if (options.type === "enum") {
    type = options.values.map((v) => `'${v}'`).join(" | ");
  } else {
    type = options.type;
  }
  return `${type}${optional ? " | undefined" : ""}`;
}
const stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
  if (typeof input !== "string") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (max !== void 0 && !(input.length <= max)) {
    errors.push("max");
  }
  if (min !== void 0 && !(input.length >= min)) {
    errors.push("min");
  }
  if (length !== void 0 && !(input.length === length)) {
    errors.push("length");
  }
  if (url !== void 0 && !URL.canParse(input)) {
    errors.push("url");
  }
  if (includes !== void 0 && !input.includes(includes)) {
    errors.push("includes");
  }
  if (startsWith !== void 0 && !input.startsWith(startsWith)) {
    errors.push("startsWith");
  }
  if (endsWith !== void 0 && !input.endsWith(endsWith)) {
    errors.push("endsWith");
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: input
  };
};
const numberValidator = ({ gt, min, lt, max, int }) => (input) => {
  const num = parseFloat(input ?? "");
  if (isNaN(num)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (gt !== void 0 && !(num > gt)) {
    errors.push("gt");
  }
  if (min !== void 0 && !(num >= min)) {
    errors.push("min");
  }
  if (lt !== void 0 && !(num < lt)) {
    errors.push("lt");
  }
  if (max !== void 0 && !(num <= max)) {
    errors.push("max");
  }
  if (int !== void 0) {
    const isInt = Number.isInteger(num);
    if (!(int ? isInt : !isInt)) {
      errors.push("int");
    }
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: num
  };
};
const booleanValidator = (input) => {
  const bool = input === "true" ? true : input === "false" ? false : void 0;
  if (typeof bool !== "boolean") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: bool
  };
};
const enumValidator = ({ values }) => (input) => {
  if (!(typeof input === "string" ? values.includes(input) : false)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: input
  };
};
function selectValidator(options) {
  switch (options.type) {
    case "string":
      return stringValidator(options);
    case "number":
      return numberValidator(options);
    case "boolean":
      return booleanValidator;
    case "enum":
      return enumValidator(options);
  }
}
function validateEnvVariable(value, options) {
  const isOptional = options.optional || options.default !== void 0;
  if (isOptional && value === void 0) {
    return {
      ok: true,
      value: options.default
    };
  }
  if (!isOptional && value === void 0) {
    return {
      ok: false,
      errors: ["missing"]
    };
  }
  return selectValidator(options)(value);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
// biome-ignore lint/correctness/noUnusedVariables: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === '' ? undefined : rawVariable;
	const options = schema[key];

	const result = validateEnvVariable(variable, options);
	if (result.ok) {
		return result.value;
	}
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};

setOnSetGetEnv(() => {
	NOTION_API_KEY = _internalGetSecret("NOTION_API_KEY");
_internalGetSecret("GOOGLE_API_KEY");

});
const DATABASE_ID = "b19a403082ee49238154f16433dd7925";let NOTION_API_KEY = _internalGetSecret("NOTION_API_KEY");
_internalGetSecret("GOOGLE_API_KEY");

function formatearFecha(fechaStr) {
  if (!fechaStr) return null;
  const fecha = new Date(fechaStr);
  const hoy = /* @__PURE__ */ new Date();
  const esHoy = fecha.getFullYear() === hoy.getFullYear() && fecha.getMonth() === hoy.getMonth() && fecha.getDate() === hoy.getDate();
  if (esHoy) {
    const matchHora2 = fechaStr.match(/(\d{2}):(\d{2})/);
    if (matchHora2) {
      const [, hora, minuto] = matchHora2;
      return `Hoy a las ${hora}:${minuto}hs`;
    }
  }
  const formatter = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  const parts = formatter.formatToParts(fecha);
  const [diaSemana, dia, mes] = parts.reduce((acc, part) => {
    if (part.type === "weekday") acc[0] = part.value;
    if (part.type === "day") acc[1] = part.value;
    if (part.type === "month") acc[2] = part.value;
    return acc;
  }, new Array(3));
  let horario = "";
  const matchHora = fechaStr.match(/(\d{2}):(\d{2})/);
  if (matchHora) {
    const [, hora, minuto] = matchHora;
    horario = ` a las ${hora}:${minuto}hs`;
  }
  return `El ${diaSemana} ${dia} de ${mes}${horario}`;
}
const getPages = async () => {
  const fechaActual = /* @__PURE__ */ new Date();
  const fechaISO = fechaActual.toISOString().split("T")[0];
  let notionPages;
  let pages = [];
  const notion = new Client({ auth: NOTION_API_KEY });
  try {
    notionPages = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Fecha",
        date: {
          on_or_after: fechaISO
        }
      },
      sorts: [
        {
          property: "Fecha",
          direction: "ascending"
        }
      ]
    });
    if (notionPages.results.length > 0) {
      const firstPage = notionPages.results[0];
      const secondPage = notionPages.results[1];
      pages.push({
        id: firstPage.id,
        date: formatearFecha(firstPage.properties.Fecha.date?.start),
        type: firstPage.properties["Tipo de Reunión"].select?.name?.toUpperCase(),
        // Optional chaining
        pageLink: firstPage.public_url,
        youtubeLink: firstPage.properties["Mensaje en YouTube"]?.url,
        // Optional chaining
        startDate: firstPage.properties.Fecha.date?.start
      });
      if (secondPage && // Check if secondPage exists
      firstPage.properties.Fecha.date?.start?.slice(0, 10) === secondPage.properties.Fecha.date?.start?.slice(0, 10)) {
        pages.push({
          id: secondPage.id,
          date: formatearFecha(secondPage.properties.Fecha.date?.start),
          type: secondPage.properties["Tipo de Reunión"].select?.name?.toUpperCase(),
          // Optional chaining
          pageLink: secondPage.url,
          youtubeLink: secondPage.properties["Mensaje en YouTube"]?.url,
          // Optional chaining
          startDate: secondPage.properties.Fecha.date?.start
        });
      }
    } else {
      console.log("No se encontraron datos.");
    }
    return pages;
  } catch (error) {
    if (error.code === "unauthorized") {
      console.log(
        "Error: No tienes acceso al recurso especificado. Revisa tus credenciales y permisos."
      );
    } else {
      console.log("Error al consultar Notion:", error.message);
    }
  }
};
const getMonthEvents = async (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startISO = firstDay.toISOString().split("T")[0];
  const endISO = lastDay.toISOString().split("T")[0];
  const notion = new Client({ auth: NOTION_API_KEY });
  try {
    const notionPages = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "Fecha",
            date: {
              on_or_after: startISO
            }
          },
          {
            property: "Fecha",
            date: {
              on_or_before: endISO
            }
          }
        ]
      },
      sorts: [
        {
          property: "Fecha",
          direction: "ascending"
        }
      ]
    });
    return notionPages.results.map((page) => {
      const p = page;
      return {
        id: p.id,
        date: formatearFecha(p.properties.Fecha.date?.start),
        type: p.properties["Tipo de Reunión"]?.select?.name?.toUpperCase(),
        pageLink: p.public_url,
        youtubeLink: p.properties["Mensaje en YouTube"]?.url,
        startDate: p.properties.Fecha.date?.start,
        tema: p.properties["Tema"]?.rich_text?.[0]?.plain_text ?? "",
        enseñanza: p.properties["Enseñanza"]?.rich_text?.[0]?.plain_text ?? "",
        presidencia: p.properties["Presidencia"]?.rich_text?.[0]?.plain_text ?? "",
        alabanza: p.properties["Alabanza"]?.rich_text?.[0]?.plain_text ?? "",
        predicacion: p.properties["Predicación"]?.rich_text?.[0]?.plain_text ?? "",
        participacionMusical: p.properties["Participación Musical"]?.rich_text?.[0]?.plain_text ?? "",
        subtema: p.properties["Subtema"]?.rich_text?.[0]?.plain_text ?? "",
        contenido: p.properties["Contenido"]?.rich_text?.[0]?.plain_text ?? ""
      };
    });
  } catch (error) {
    console.log("Error al consultar eventos del mes en Notion:", error.message);
    return [];
  }
};

async function GET({ url }) {
  const year = url.searchParams.get("year");
  const month = url.searchParams.get("month");
  if (year !== null && month !== null) {
    const events = await getMonthEvents(Number(year), Number(month));
    return new Response(JSON.stringify(events), {
      headers: { "Content-Type": "application/json" }
    });
  }
  const pages = await getPages();
  return new Response(JSON.stringify(pages), {
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
