import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component, i as is_promise, n as noop, f as each } from "../../chunks/ssr.js";
import "bitcoin-qr/loader";
const mimeType = "application/json";
const ADMIN_MACAROON = "0201036c6e6402f801030a1095a113103aa90541695b6f7be5e57bb71201301a160a0761646472657373120472656164120577726974651a130a04696e666f120472656164120577726974651a170a08696e766f69636573120472656164120577726974651a210a086d616361726f6f6e120867656e6572617465120472656164120577726974651a160a076d657373616765120472656164120577726974651a170a086f6666636861696e120472656164120577726974651a160a076f6e636861696e120472656164120577726974651a140a057065657273120472656164120577726974651a180a067369676e6572120867656e657261746512047265616400000620b77d147caf8a76e051026e5f8fda8e12788050b5f481f1f97b01749c633cbc9a";
const API_ENDPOINT = "https://test-node.u.voltageapp.io:8080";
async function lndFetcher(path, postBody) {
  const url = `${API_ENDPOINT}${path}`;
  const method = postBody ? "POST" : "GET";
  const init = { method };
  let headers = {
    "Grpc-Metadata-Macaroon": ADMIN_MACAROON,
    Accept: mimeType
  };
  if (postBody) {
    init.body = JSON.stringify(postBody);
    headers = { ...headers, "Content-Type": mimeType };
  }
  const result = await window.fetch(url, { ...init, headers });
  const data = await result.json().catch();
  if (!result.ok) {
    throw new Error(
      data?.message || result.statusText || `${path} 😱 ${result.status}`
    );
  }
  return data;
}
function lndGetWalletBalance() {
  return lndFetcher("/v1/balance/blockchain");
}
function lndGetInfo() {
  return lndFetcher("/v1/getinfo");
}
function lndListChannels() {
  return lndFetcher("/v1/channels");
}
function lndListInvoices() {
  return lndFetcher("/v1/invoices");
}
const css$1 = {
  code: "button.svelte-q1iama{position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;border-width:1px;--tw-border-opacity:1;border-color:rgb(234 88 12 / var(--tw-border-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;border-radius:0.5rem;--tw-bg-opacity:1;background-color:rgb(234 88 12 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;font-weight:500;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}button.svelte-q1iama:hover,button.svelte-q1iama:focus-visible,button.svelte-q1iama:active{--tw-border-opacity:1;border-color:rgb(194 65 12 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(194 65 12 / var(--tw-bg-opacity))\n}.wide.svelte-q1iama{width:100%\n}",
  map: null
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "button" } = $$props;
  let { wide = false } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.wide === void 0 && $$bindings.wide && wide !== void 0)
    $$bindings.wide(wide);
  $$result.css.add(css$1);
  return `<button${add_attribute("type", type, 0)} class="${["svelte-q1iama", wide ? "wide" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``} </button>`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "" } = $$props;
  let { value = "" } = $$props;
  let { label = "" } = $$props;
  let { placeholder = "" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  return `<label${add_attribute("for", id, 0)}>${escape(label)}</label> <input class="rounded-lg border-2 border-gray-300 p-3 text-gray-700 outline-gray-300" type="text"${add_attribute("id", id, 0)}${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", value, 0)}>`;
});
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="rounded-xl bg-white p-4 shadow-md">${slots.default ? slots.default({}) : ``}</div>`;
});
const css = {
  code: "h2.svelte-cywqdo{font-size:1.5rem;line-height:2rem;font-weight:700\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let amount = 0;
  let memo = "";
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="mx-8 flex flex-col items-center"><div class="flex items-center gap-2"><img src="/assets/voltage-name.svg" alt="Voltage" class="w-[400px]"> ${``}</div>  ${``} <div class="flex flex-col gap-8 lg:flex-row"><div class="flex flex-1 flex-col gap-4">${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="flex flex-col gap-8"><div class="flex flex-col gap-4"><h2 class="svelte-cywqdo" data-svelte-h="svelte-19o98kh">Create Invoice</h2>  <form class="flex flex-col gap-2">${validate_component(Input, "Input").$$render(
          $$result,
          {
            id: "amount",
            label: "Amount",
            value: amount
          },
          {
            value: ($$value) => {
              amount = $$value;
              $$settled = false;
            }
          },
          {}
        )} ${validate_component(Input, "Input").$$render(
          $$result,
          { id: "memo", label: "Memo", value: memo },
          {
            value: ($$value) => {
              memo = $$value;
              $$settled = false;
            }
          },
          {}
        )} ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
          default: () => {
            return `Create Invoice`;
          }
        })}</form></div></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="flex flex-col gap-4"><h2 class="svelte-cywqdo" data-svelte-h="svelte-dfcoew">Get New Address</h2> ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
          default: () => {
            return `Get New Address`;
          }
        })}</div>`;
      }
    })}</div> <div class="max-w-1/2 flex flex-1 flex-col gap-4">${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<h2 class="svelte-cywqdo" data-svelte-h="svelte-db0bj6">Node Balance</h2> ${function(__value) {
          if (is_promise(__value)) {
            __value.then(null, noop);
            return ` <p data-svelte-h="svelte-qeejp2">loading...</p> `;
          }
          return function(result) {
            return ` <ul><li>Total Balance: ${escape(result.total_balance)}</li> <li>Confirmed Balance: ${escape(result.confirmed_balance)}</li> <li>Unconfirmed Balance: ${escape(result.unconfirmed_balance)}</li></ul> `;
          }(__value);
        }(lndGetWalletBalance())}`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<h2 class="svelte-cywqdo" data-svelte-h="svelte-1mbwfxq">Node Info</h2> ${function(__value) {
          if (is_promise(__value)) {
            __value.then(null, noop);
            return ` <p data-svelte-h="svelte-qeejp2">loading...</p> `;
          }
          return function(result) {
            return ` <ul><li>Node Alias: ${escape(result.alias)}</li> <li>Pubkey: ${escape(result.identity_pubkey)}</li> <li>Peers: ${escape(result.num_peers)}</li> <li>Synced to Chain: ${escape(result.synced_to_chain)}</li></ul> `;
          }(__value);
        }(lndGetInfo())}`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<h2 class="svelte-cywqdo" data-svelte-h="svelte-lzh9qj">Channel Info</h2> ${function(__value) {
          if (is_promise(__value)) {
            __value.then(null, noop);
            return ` <p data-svelte-h="svelte-qeejp2">loading...</p> `;
          }
          return function(result) {
            return ` <ul><li>Number of channels: ${escape(result.channels.length)}</li></ul> `;
          }(__value);
        }(lndListChannels())}`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, {}, {}, {
      default: () => {
        return `<h2 class="svelte-cywqdo" data-svelte-h="svelte-p2alua">Invoices</h2> ${function(__value) {
          if (is_promise(__value)) {
            __value.then(null, noop);
            return ` <p data-svelte-h="svelte-qeejp2">loading...</p> `;
          }
          return function(result) {
            return ` <ul class="max-h-80 max-w-full overflow-y-scroll break-all"> ${each(result.invoices, (invoice) => {
              return `<li>${escape(invoice.add_index)} - ${escape(invoice.state)} ${escape(invoice.payment_request)}</li>`;
            })}</ul> `;
          }(__value);
        }(lndListInvoices())}`;
      }
    })}</div></div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
