# Github Release To Teamwork Notebook
This action will update the specified notebook in Teamwork with release information. Useful for automated release notes.

## Inputs
`notebook_id`: (Required) The ID of the notebook to update in Teamwork
`domain`: (Required) The domain of your Teamwork site. Follows the format <company>.teamwork.com for US sites, or <company>.eu.teamwork.com for EU sites
`api_key`: (Required) Your Teamwork API key