const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
  panel.addEventListener('click', ()=>{
    removeActiveClasses()
    panel.classList.add('active')
  })
})

function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active')
  })
}

/* const panelItems = document.querySelectorAll(".container > .panel");
panelItems.forEach(item => {
    item.addEventListener('click',() => {
        [].filter.call(item.parentElement.children,el => el !== item).forEach(el => el.classList.remove('active'));
        item.classList.add('active')
    });
}); */