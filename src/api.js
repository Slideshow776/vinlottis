const BASE_URL = __APIURL__ || window.location.origin;

const statistics = () => {
  const url = new URL("/api/purchase/statistics", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const colorStatistics = () => {
  const url = new URL("/api/purchase/statistics/color", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const highscoreStatistics = () => {
  const url = new URL("/api/highscore/statistics", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const overallWineStatistics = () => {
  const url = new URL("/api/wines/statistics/overall", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const chartWinsByColor = () => {
  const url = new URL("/api/purchase/statistics/color", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const chartPurchaseByColor = () => {
  const url = new URL("/api/purchase/statistics", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const prelottery = () => {
  const url = new URL("/api/wines/prelottery", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const log = sendObject => {
  const url = new URL("/api/log", BASE_URL);

  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(sendObject)
  };

  return fetch(url.href, options).then(resp => resp.json());
};

const addAttendee = sendObject => {
  const url = new URL("/api/virtual/attendee", BASE_URL);

  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(sendObject)
  };

  return fetch(url.href, options).then(resp => resp.json());
};

const getVirtualWinner = () => {
  const url = new URL("/api/virtual/winner", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const attendeesSecure = () => {
  const url = new URL("/api/virtual/attendees/secure", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const winnersSecure = () => {
  const url = new URL("/api/virtual/winners/secure", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const winners = () => {
  const url = new URL("/api/virtual/winners", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const deleteWinners = () => {
  const url = new URL("/api/virtual/winners", BASE_URL);

  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE"
  };

  return fetch(url.href, options).then(resp => resp.json());
};

const deleteAttendees = () => {
  const url = new URL("/api/virtual/attendees", BASE_URL);

  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE"
  };

  return fetch(url.href, options).then(resp => resp.json());
};

const attendees = () => {
  const url = new URL("/api/virtual/attendees", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const logWines = wines => {
  const url = new URL("/api/log/wines", BASE_URL);

  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(wines)
  };

  return fetch(url.href, options).then(resp => resp.json());
};

const wineSchema = () => {
  const url = new URL("/api/log/schema", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const barcodeToVinmonopolet = id => {
  const url = new URL("/api/wineinfo/" + id, BASE_URL);

  return fetch(url.href).then(async resp => {
    if (!resp.ok) {
      if (resp.status == 404) {
        throw await resp.json();
      }
    } else {
      return resp.json();
    }
  });
};

const handleErrors = async resp => {
  if ([400, 409].includes(resp.status)) {
    throw await resp.json();
  } else {
    console.error("Unexpected error occured when login/register user:", resp);
    throw await resp.json();
  }
};

const login = (username, password) => {
  const url = new URL("/login", BASE_URL);
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ username, password })
  };

  return fetch(url.href, options).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      return handleErrors(resp);
    }
  });
};

const register = (username, password) => {
  const url = new URL("/register", BASE_URL);
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ username, password })
  };

  return fetch(url.href, options).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      return handleErrors(resp);
    }
  });
};

const getChatHistory = (skip = null, take = null) => {
  const url = new URL("/api/chat/history", BASE_URL);
  if (!isNaN(skip)) url.searchParams.append("skip", skip);
  if (!isNaN(take)) url.searchParams.append("take", take);

  return fetch(url.href).then(resp => resp.json());
};

const finishedDraw = () => {
  const url = new URL("/api/virtual/finish", BASE_URL);

  return fetch(url.href).then(resp => resp.json());
};

const getAmIWinner = id => {
  const url = new URL(`/api/virtual-registration/${id}`, BASE_URL);
  return fetch(url.href).then(resp => resp.json());
};

const postWineChosen = (id, wineName) => {
  const url = new URL(`/api/virtual-registration/${id}`, BASE_URL);
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ wineName: wineName })
  };

  return fetch(url.href, options).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      return handleErrors(resp);
    }
  });
};

const historyAll = () => {
  const url = new URL(`/api/lottery/all`, BASE_URL);

  return fetch(url.href).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      return handleErrors(resp);
    }
  });
}

export {
  statistics,
  colorStatistics,
  highscoreStatistics,
  overallWineStatistics,
  chartWinsByColor,
  chartPurchaseByColor,
  prelottery,
  log,
  logWines,
  wineSchema,
  barcodeToVinmonopolet,
  login,
  register,
  addAttendee,
  getVirtualWinner,
  attendeesSecure,
  attendees,
  winners,
  winnersSecure,
  deleteWinners,
  deleteAttendees,
  getChatHistory,
  finishedDraw,
  getAmIWinner,
  postWineChosen,
  historyAll
};
