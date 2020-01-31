module.exports = (operation, manager) => {
    const current = manager.getCurrent();

    return current.activeCard ? '' : 'card-not-active';
};
