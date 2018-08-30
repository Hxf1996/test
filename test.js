const Y = f => (g => g(g))(g => f(x => g(g)(x)));

const a = Y(ask => count =>
    prompt("Accept terms?") !== "yes"
        ? ask(count + 1)
        : alert("At last! It took " + count + " times.")
);
