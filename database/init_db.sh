#!/bin/bash
psql postgres postgres -c "\i /home/database/create_test_table.sql"
psql postgres postgres -c "\i /home/database/procedures.sql"
psql postgres postgres -c "\i /home/database/triggers.sql"
psql postgres postgres -c "\i /home/database/insert_all_data.sql"