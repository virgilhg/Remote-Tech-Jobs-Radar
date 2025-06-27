// 1. When the button is clicked, run loadJobs()
document.querySelector('button').addEventListener('click', loadJobs)

function loadJobs() {
  // 2. API endpoint: only remote, limit to 5 jobs
  const url = 'https://www.arbeitnow.com/api/job-board-api?remote=true&limit=5'
  const container = document.getElementById('jobs')

  // 3. Show a loading message
  container.innerHTML = 'Loading remote jobs…'

  // 4. Fetch the job data
  fetch(url)
    .then(res => res.json())           // parse response as JSON
    .then(data => {
      console.log(data)                // inspect full response

      // 5. The jobs array is in data.data
      const list = data.data || []
      container.innerHTML = ''         // clear loading text

      // 6. For each job, create a simple card
      list.forEach(job => {
        const card = document.createElement('div')
        card.className = 'job-card'

        // Job title
        const title = document.createElement('h3')
        title.innerText = job.title
        card.appendChild(title)

        // Company and location
        const company = document.createElement('p')
        company.innerText = `🏢 ${job.company_name} — ${job.location}`
        card.appendChild(company)

        // Posted date
        const date = document.createElement('p')
        date.innerText = `🗓 Posted: ${new Date(job.created_at).toLocaleDateString()}`
        card.appendChild(date)

        // “View Job” link
        const link = document.createElement('a')
        link.href = job.url
        link.target = '_blank'
        link.innerText = 'View Job'
        card.appendChild(link)

        container.appendChild(card)
      })

      // 7. If no jobs found
      if (list.length === 0) {
        container.innerText = 'No remote jobs available right now.'
      }
    })
    .catch(err => {
      console.log(`error ${err}`)
      container.innerText = 'Sorry, could not load jobs now.'
    })
}
